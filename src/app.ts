import express, { Express, Request, Response , Application } from 'express';
import { param, body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import * as db from './models/db';
import cors from 'cors';

//For env File 
dotenv.config();

const app: Application = express();
app.use(cors<Request>());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req: Request, res: Response) => {
  res.send('<h1>Backend Server</h1>'
	   + '<br/>GET /duty/list/:current/:pageSize/:sortField/:sortOrder to retrieve duties'
	   + '<br/>GET /duty/get/:id to get duty info by id'
	   + '<br/>POST /duty/create to add duty (name)'
	   + '<br/>PUT /duty/update/:id to update duty (name) by id'
	   + '<br/>DELETE /duty/delete/:id to delete duty by id');
});

app.get('/duty/list/:current/:pageSize/:sortField?/:sortOrder?',
	param('current', 'current must be greater than 1').isInt({ min: 1 }),
	param('pageSize', 'pageSize must be between 1 and 100').isInt({ min: 1, max: 100 }),
	param('sortField', 'sortField should be \'id\' / \'created_date\' / \'modified_date\'').optional().isIn(['id', 'created_date', 'modified_date']),
	param('sortOrder', 'sortOrder should be \'ascend\' / \'descend\'').optional().isIn(['ascend', 'descend']),
	async (req: Request, res: Response) => {
  console.log('/duty/list/:current/:pageSize/:sortField/:sortOrder');
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({ errors: validation.array() });
  }
  const sortField = (req.params.sortField === undefined) ? 'id' : req.params.sortField;
  const sortOrder = (req.params.sortOrder === undefined) ? 'ASC' : ((req.params.sortOrder == 'descend') ? 'DESC' : 'ASC');
  const offset = (parseInt(req.params.current) - 1) * parseInt(req.params.pageSize);
  const result = await db.query('SELECT * FROM duty ORDER BY '+ sortField + ' ' + sortOrder + ' OFFSET ' + offset + ' LIMIT ' + req.params.pageSize + ';', []);
  const result2 = await db.query('SELECT COUNT(1) AS cnt FROM duty;', []);
  res.send({ results: result.rows, totalCount: result2.rows[0].cnt });
});

app.get('/duty/get/:id',
	param('id', 'id must be between 1 to 9223372036854775807').isInt({ min: 1, max: 9223372036854775807 }),
	async (req: Request, res: Response) => {
  console.log('/duty/get/:id');
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({ errors: validation.array() });
  }
  const result = await db.query('SELECT * FROM duty WHERE id = $1;', [req.params.id]);
  res.send(result.rows[0]);
});

app.post('/duty/create',
	 body('name', 'name must exist and not exceed 255 characters').isLength({ min: 1, max: 255 }),
	 async (req: Request, res: Response) => {
  console.log('/duty/create');
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({ errors: validation.array() });
  }
  const result = await db.query('INSERT INTO duty (id, name, created_date, modified_date) VALUES (DEFAULT, $1, NOW(), NOW()) RETURNING id;', [req.body.name]);
  res.send(result.rows[0]);
});

app.put('/duty/update/:id',
	param('id', 'id must be between 1 to 9223372036854775807').isInt({ min: 1, max: 9223372036854775807 }),
	body('name', 'name must exist and not exceed 255 characters').isLength({ min: 1, max: 255 }),
	async (req: Request, res: Response) => {
  console.log('/duty/update/:id');
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({ errors: validation.array() });
  }
  const result = await db.query('UPDATE duty SET name = $1, modified_date = NOW() WHERE id = $2;', [req.body.name, req.params.id]);
  res.send({ result: result.rowCount });
});

app.delete('/duty/delete/:id',
	   param('id', 'id must be between 1 to 9223372036854775807').isInt({ min: 1, max: 9223372036854775807 }),
	   async (req: Request, res: Response) => {
  console.log('/duty/delete/:id');
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({ errors: validation.array() });
  }
  const result = await db.query('DELETE FROM duty WHERE id = $1;', [req.params.id]);
  res.send({ result: result.rowCount });
});

export = app;
