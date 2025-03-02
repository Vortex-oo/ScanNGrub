import express from 'express';
import { body, param } from 'express-validator';
import { listRestaurants, addRestaurant, manageRestaurant, addMenuItem, editMenuItem, deleteMenuItem, scanRestaurant } from '../controllers/restaurant.controller.js';

const restaurantRoute = express.Router();

// Route to list restaurants and add a new restaurant
restaurantRoute.post('/owner-dashboard', listRestaurants);


restaurantRoute.post('/add-restaurant', [
    body('name').notEmpty().withMessage('Restaurant name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('contactNumber').isLength({ min: 10, max: 10 }).withMessage('Contact number must be 10 digits'),
    body('upiId').notEmpty().withMessage('UPI URL is required')
], addRestaurant);

// Route to manage a specific restaurant
restaurantRoute.get('/details/:id', [
    param('id').isMongoId().withMessage('Invalid restaurant ID')
], manageRestaurant);

// Routes to add, edit, and delete menu items for a specific restaurant
restaurantRoute.post('/:id/menu-item', [
    param('id').isMongoId().withMessage('Invalid restaurant ID'),
    body('name').notEmpty().withMessage('Menu item name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').notEmpty().withMessage('Description is required')
], addMenuItem);

restaurantRoute.put('/:id/menu-item/:itemId', [
    param('id').isMongoId().withMessage('Invalid restaurant ID'),
    param('itemId').isMongoId().withMessage('Invalid menu item ID')
], editMenuItem);

restaurantRoute.delete('/:id/menu-item/:itemId', [
    param('id').isMongoId().withMessage('Invalid restaurant ID'),
    param('itemId').isMongoId().withMessage('Invalid menu item ID')
], deleteMenuItem);

restaurantRoute.get('/scan/:id', [
    param('id').isMongoId().withMessage('Invalid restaurant ID'),
], scanRestaurant);

export default restaurantRoute;