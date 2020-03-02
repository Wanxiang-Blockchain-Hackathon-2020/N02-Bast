/// A runtime module template with necessary imports

/// Feel free to remove or edit this file as needed.
/// If you change the name of this file, make sure to update its references in runtime/src/lib.rs
/// If you remove this file, you can remove those references


/// For more guidance on Substrate modules, see the example module
/// https://github.com/paritytech/substrate/blob/master/srml/example/src/lib.rs

use rstd::prelude::*;
use support::{decl_module, decl_storage, decl_event, StorageValue, StorageMap, dispatch::Result, Parameter, ensure};
use system::{self, ensure_signed};
use parity_codec::Codec;
use parity_codec::{Decode, Encode};
use runtime_primitives::traits::{CheckedSub, CheckedAdd, Member, SimpleArithmetic, As};


/// The module's configuration trait.
pub trait Trait: system::Trait {
	// TODO: Add other types and constants required configure this module.

	/// The overarching event type.
	type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
	type TokenBalance: Parameter + Member + SimpleArithmetic + Codec + Default + Copy + As<usize> + As<u128>;
}

#[derive(Encode, Decode, Default, Clone, PartialEq, Debug)]
pub struct Erc20Token<U> {
	name: Vec<u8>,
	ticker: Vec<u8>,
	total_supply: U,
}

// This module's storage items.
decl_storage! {
	trait Store for Module<T: Trait> as multiToken {
		// token id nonce for storing the next token id available for token initialization
		// inspired by the AssetId in the SRML assets module
		TokenId get(token_id): u32;
		// details of the token corresponding to a token id
		Tokens get(token_details): map u32 => Erc20Token<T::TokenBalance>;
		// balances mapping for an account and token
		BalanceOf get(balance_of): map (u32, T::AccountId) => T::TokenBalance;
		// allowance for an account and token
		Allowance get(allowance): map (u32, T::AccountId, T::AccountId) => T::TokenBalance;

		// Just a dummy storage item. 
		// Here we are declaring a StorageValue, `Something` as a Option<u32>
		// `get(something)` is the default getter which returns either the stored `u32` or `None` if nothing stored
		Something get(something): Option<u32>;
	}
}

decl_module! {
	/// The module declaration.
	pub struct Module<T: Trait> for enum Call where origin: T::Origin {
		// Initializing events
		// this is needed only if you are using events in your module
		fn deposit_event<T>() = default;

		// 初始化一个token
		fn init(origin, name: Vec<u8>, ticker: Vec<u8>, total_supply: T::TokenBalance) -> Result {
			let sender = ensure_signed(origin)?;

			// checking max size for name and ticker
			// byte arrays (vecs) with no max size should be avoided
			ensure!(name.len() <= 64, "token name cannot exceed 64 bytes");
			ensure!(ticker.len() <= 32, "token ticker cannot exceed 32 bytes");

			let token_id = Self::token_id();
			let next_token_id = token_id.checked_add(1).ok_or("overflow in calculating next token id")?;
			<TokenId<T>>::put(next_token_id);

			let token = Erc20Token {
				name,
				ticker,
				total_supply,
			};

			<Tokens<T>>::insert(token_id, token);
			<BalanceOf<T>>::insert((token_id, sender), total_supply);

			Ok(())
		}

		fn transfer(_origin, token_id: u32, to: T::AccountId, value: T::TokenBalance) -> Result {
			let sender = ensure_signed(_origin)?;
			Self::_transfer(token_id, sender, to, value)
		}


		fn approve(_origin, token_id: u32, spender: T::AccountId, value: T::TokenBalance) -> Result {
			let sender = ensure_signed(_origin)?;
			ensure!(<BalanceOf<T>>::exists((token_id, sender.clone())), "Account does not own this token");

			let allowance = Self::allowance((token_id, sender.clone(), spender.clone()));
			let updated_allowance = allowance.checked_add(&value).ok_or("overflow in calculating allowance")?;
			<Allowance<T>>::insert((token_id, sender.clone(), spender.clone()), updated_allowance);

			Self::deposit_event(RawEvent::Approval(token_id, sender.clone(), spender.clone(), value));

			Ok(())
		}

		pub fn transfer_from(_origin, token_id: u32, from: T::AccountId, to: T::AccountId, value: T::TokenBalance) -> Result {
			ensure!(<Allowance<T>>::exists((token_id, from.clone(), to.clone())), "Allowance does not exist.");
			let allowance = Self::allowance((token_id, from.clone(), to.clone()));
			ensure!(allowance >= value, "Not enough allowance.");

			// using checked_sub (safe math) to avoid overflow
			let updated_allowance = allowance.checked_sub(&value).ok_or("overflow in calculating allowance")?;
			<Allowance<T>>::insert((token_id, from.clone(), to.clone()), updated_allowance);

			Self::deposit_event(RawEvent::Approval(token_id, from.clone(), to.clone(), value));
			Self::_transfer(token_id, from, to, value)
		}



		// Just a dummy entry point.
		// function that can be called by the external world as an extrinsics call
		// takes a parameter of the type `AccountId`, stores it and emits an event
		pub fn do_something(origin, something: u32) -> Result {
			// TODO: You only need this if you want to check it was signed.
			let who = ensure_signed(origin)?;

			// TODO: Code to execute when something calls this.
			// For example: the following line stores the passed in u32 in the storage
			<Something<T>>::put(something);

			// here we are raising the Something event
			Self::deposit_event(RawEvent::SomethingStored(something, who));
			Ok(())
		}
	}
}

decl_event!(
	pub enum Event<T> 
		where
		AccountId = <T as system::Trait>::AccountId,
		Balance = <T as self::Trait>::TokenBalance
	{
        // event for transfer of tokens
        // tokenid, from, to, value
        Transfer(u32, AccountId, AccountId, Balance),
        // event when an approval is made
        // tokenid, owner, spender, value
        Approval(u32, AccountId, AccountId, Balance),
		// Just a dummy event.
		// Event `Something` is declared with a parameter of the type `u32` and `AccountId`
		// To emit this event, we call the deposit funtion, from our runtime funtions
		SomethingStored(u32, AccountId),
	}
);

// implementation of mudule
// utility and private functions
// if marked public, accessible by other modules
impl<T: Trait> Module<T> {
    // the ERC20 standard transfer function
    // internal
    fn _transfer(
        token_id: u32,
        from: T::AccountId,
        to: T::AccountId,
        value: T::TokenBalance,
    ) -> Result {
        ensure!(<BalanceOf<T>>::exists((token_id, from.clone())), "Account does not own this token");
        let sender_balance = Self::balance_of((token_id, from.clone()));
        ensure!(sender_balance >= value, "Not enough balance.");

        let updated_from_balance = sender_balance.checked_sub(&value).ok_or("overflow in calculating balance")?;
        let receiver_balance = Self::balance_of((token_id, to.clone()));
        let updated_to_balance = receiver_balance.checked_add(&value).ok_or("overflow in calculating balance")?;
        
        // reduce sender's balance
        <BalanceOf<T>>::insert((token_id, from.clone()), updated_from_balance);

        // increase receiver's balance
        <BalanceOf<T>>::insert((token_id, to.clone()), updated_to_balance);

        Self::deposit_event(RawEvent::Transfer(token_id, from, to, value));
        Ok(())
    }
}

/// tests for this module
#[cfg(test)]
mod tests {
	use super::*;

	use runtime_io::with_externalities;
	use primitives::{H256, Blake2Hasher};
	use support::{impl_outer_origin, assert_ok};
	use runtime_primitives::{
		BuildStorage,
		traits::{BlakeTwo256, IdentityLookup},
		testing::{Digest, DigestItem, Header}
	};

	impl_outer_origin! {
		pub enum Origin for Test {}
	}

	// For testing the module, we construct most of a mock runtime. This means
	// first constructing a configuration type (`Test`) which `impl`s each of the
	// configuration traits of modules we want to use.
	#[derive(Clone, Eq, PartialEq)]
	pub struct Test;
	impl system::Trait for Test {
		type Origin = Origin;
		type Index = u64;
		type BlockNumber = u64;
		type Hash = H256;
		type Hashing = BlakeTwo256;
		type Digest = Digest;
		type AccountId = u64;
		type Lookup = IdentityLookup<Self::AccountId>;
		type Header = Header;
		type Event = ();
		type Log = DigestItem;
	}
	impl Trait for Test {
		type Event = ();
	}
	type multiToken = Module<Test>;

	// This function basically just builds a genesis storage key/value store according to
	// our desired mockup.
	fn new_test_ext() -> runtime_io::TestExternalities<Blake2Hasher> {
		system::GenesisConfig::<Test>::default().build_storage().unwrap().0.into()
	}

	#[test]
	fn it_works_for_default_value() {
		with_externalities(&mut new_test_ext(), || {
			// Just a dummy test for the dummy funtion `do_something`
			// calling the `do_something` function with a value 42
			assert_ok!(multiToken::do_something(Origin::signed(1), 42));
			// asserting that the stored value is equal to what we stored
			assert_eq!(multiToken::something(), Some(42));
		});
	}
}
