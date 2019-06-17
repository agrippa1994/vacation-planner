
class MapController {

    constructor(dao) {
        this.dao = dao;
    }

    async handlePostPosition(req, res) {
        try {
            if(!req.body || !("username" in req.body) || !("position" in req.body))
                return res.status(400).end();

            if(!("timestamp" in req.body.position) || !("coords" in req.body.position))
                return res.status(400).end();

            if(!("longitude" in req.body.position.coords) || !("latitude" in req.body.position.coords))
                return res.status(400).end();

            await this.dao.updatePositionForUser(
                req.body.username,
                req.body.position.timestamp,
                req.body.position.coords.longitude,
                req.body.position.coords.latitude
            );
            res.status(201).end();
        } catch(e) {
            console.error(e);
            res.status(500).json(e);
        }
    }

    async handleGetAllPositions(req, res) {
        try {
            const positions = await this.dao.getAllPositions();
            var result = [];
            for(const position of positions) {
                result.push({
                    username: position.username,
                    position: {
                        timestamp: position.timestamp,
                        coords: {
                            longitude: position.longitude,
                            latitude: position.latitude
                        }
                    }
                });
            }
            res.status(200).json(result);
        } catch(e) {
            console.error(e);
            res.status(500).json(e);
        }
    }
}

module.exports = { MapController };