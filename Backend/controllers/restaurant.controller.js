    import restaurantModel from '../models/res.model.js';
    import menuModel from '../models/menu.model.js';
    import crypto from 'crypto';
    import QRCode from 'qrcode';
    // Controller to list all restaurants
    export const listRestaurants = async (req, res) => {
        try {
            const {ownerId} = req.body
            const restaurants = await restaurantModel.find({ownerId});
            res.status(200).json(restaurants);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Controller to add a new restaurant
    export const addRestaurant = async (req, res) => {
        const { name, address, contactNumber,ownerId } = req.body;
        try {
            const restaurantId = crypto.randomBytes(10).toString('hex')
            const newRestaurant = new restaurantModel({ restaurantId,ownerId, name, address, contactNumber });
            await newRestaurant.save();
            res.status(201).json(newRestaurant);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    // Controller to manage a specific restaurant
    export const manageRestaurant = async (req, res) => {
        const { id } = req.params;
        try {
            const restaurant = await restaurantModel.findById(id).populate('menuItems');
            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            res.status(200).json(restaurant);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Controller to add a menu item to a specific restaurant
    export const addMenuItem = async (req, res) => {
        const { id } = req.params;
        const { name, price, description, available } = req.body;
        try {
            const newMenuItem = new menuModel({ restaurantId: id, name, price, description, available });
            await newMenuItem.save();

            const restaurant = await restaurantModel.findById(id);
            restaurant.menuItems.push(newMenuItem._id);
            await restaurant.save();

            res.status(201).json(newMenuItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    // Controller to edit a menu item of a specific restaurant
    export const editMenuItem = async (req, res) => {
        const { id, itemId } = req.params;
        const { name, price, description, available } = req.body;
        try {
            const menuItem = await menuModel.findByIdAndUpdate(itemId, { name, price, description, available }, { new: true });
            if (!menuItem) {
                return res.status(404).json({ message: 'Menu item not found' });
            }
            res.status(200).json(menuItem);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    // Controller to delete a menu item of a specific restaurant
    export const deleteMenuItem = async (req, res) => {
        const { id, itemId } = req.params;
        try {
            const menuItem = await menuModel.findByIdAndDelete(itemId);
            if (!menuItem) {
                return res.status(404).json({ message: 'Menu item not found' });
            }

            const restaurant = await restaurantModel.findById(id);
            restaurant.menuItems.pull(itemId);
            await restaurant.save();

            res.status(200).json({ message: 'Menu item deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Controller to scan a restaurant
    export const scanRestaurant = async (req, res) => {
        const { id } = req.params;

        try {

            const restaurant = await restaurantModel.findById(id).populate('menuItems');
            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            const qrCodeUrl = await QRCode.toDataURL(`http://localhost:5173/user/login?${restaurant._id}`);
            
            restaurant.QrCode = qrCodeUrl;
            await restaurant.save();
            res.status(200).json({
                message: 'Restaurant scanned successfully',
                qrCode: qrCodeUrl,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
            
        }
    }