import express, {Express, Request, Response, NextFunction} from 'express';
import path from 'path';
import { path as rootPath } from 'app-root-path';
import api from './api';
import HttpException from './exceptions/HttpException';

export default (app:Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', api);

  app.use((err:HttpException, req:Request, res:Response, next: NextFunction) => {
    console.error('SOME ERR', err);
    res.status(400).send({ message: err && err.message ? err.message : err });
  });

  app.use(express.static(path.join(rootPath, '..', 'frontend', 'build')));
  app.use(express.static(path.join(rootPath, '..', 'tmp')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(rootPath, '..', 'frontend', 'build', 'index.tsx.tsx.ts.html'));
  });
};