import express from 'express'
import path from 'path'

/**
 * 
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
    app.use(express.static(path.join('./src', 'public'),{
        setHeaders: function (res, path, stat) {
          if (path.endsWith('.css')) {
            res.set('Content-Type', 'text/css');
          } else {
            res.set('Content-Type', 'text/html');
          }
        }
    }));
    app.use(express.static(path.join('./src', 'vendor'),{
      setHeaders: function (res, path, stat) {
        if (path.endsWith('.css')) {
          res.set('Content-Type', 'text/css');
        } else {
          res.set('Content-Type', 'text/html');
        }
      }
  }));
    app.set('view engine', 'ejs');
    app.set("views", path.join('./src', 'views'));
}
export default configViewEngine;