# -*- coding=utf-8 -*-
import sqlite3
from flask import Flask,request,session,g,redirect,url_for,abort,render_template,flash,current_app,jsonify,make_response
from contextlib import closing
import time
import hashlib
import xml.etree.ElementTree as ET
import urllib
import requests
import json
from flask import abort
DATABASE = 'flaskr.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'

app = Flask(__name__)
app.config.from_object(__name__)

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('scheme.sql') as f:
            db.cursor().executescript(f.read().decode())
        db.commit()

@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    g.db.close()


@app.route('/')
def show_entries():
    cur = g.db.execute('select title,text from entries order by id desc')
    entries = [dict(title=row[0],text=row[1]) for row in cur.fetchall()]
    return render_template('show_entries.html',entries=entries)


@app.route('/add',methods=['GET','POST'])
def add_entry():
    if not session.get('logged_in'):
        abort(401)

    payload =  {"issuer":"did:weid:1:0x0b33ef738278d038958e83974b465f319ce59418","org-id":"webank"}
    response = requests.get('http://101.200.52.114/weid-api/createWeId', params=payload)
    result = response.json()
    # 打印result
    #print(result)

    g.db.execute('insert into entries (title,text) values (?,?)',[request.form['title'],request.form['text']])
    g.db.commit()
    flash(result)
    return redirect(url_for('show_entries'))

@app.route('/signup',methods=['GET','POST'])
def login():
    error = None
    response = requests.get('http://101.200.52.114/weid-api/createWeId')
    result = response.json()
    if request.method == 'POST':
        if request.form['username']!= app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password']!= app.config['PASSWORD']:
            error = "Invalid password"
        else:
            session['logged_in']= True
            flash('YOu are sign up')
            print(response.status_code)
            print(result)

            flash(result)
            flash("你的weid虽然已保存在数据库，但是建议记住你的weid")

            return redirect(url_for('show_entries'))

    return render_template('login.html',error=error)	

@app.route('/logout')
def logout():
    session.pop('logged_in',None)
    flash("You are logged out")
    current_app.logger.info('logged by current_app from main')
    return redirect(url_for('show_entries'))


if __name__ == "__main__":
    app.run()
