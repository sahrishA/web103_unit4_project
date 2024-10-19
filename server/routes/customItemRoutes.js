import express from 'express'
import {
    getCustomItems,
    getCustomItemById,
    createCustomItem,
    updateCustomItem,
    deleteCustomItem
  } from '../controllers/customItemController.js';
  const router =express.Router();
  //define routes
  router.get('/custom_items',getCustomItems);
  router.get('/custom_items/:id',getCustomItemById);
  router.get('/custom_items',createCustomItem);
  router.get('/custom_items/:id',updateCustomItem);
  router.get('/custom_items/:id',deleteCustomItem);
  export default router;