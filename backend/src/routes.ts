import express, {Express} from 'express';
import path from 'path';
import { path as rootPath } from 'app-root-path';

export default (app:Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(express.static(path.join(rootPath, '..', 'frontend', 'build')));
  app.use(express.static(path.join(rootPath, '..', 'tmp')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(rootPath, '..', 'frontend', 'build', 'index.tsx.tsx.ts.html'));
  });
};