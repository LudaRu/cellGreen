module.exports = (server) => {
    const io = require('socket.io').listen(server);

    const MAX_COL = 10;
    const MAX_ROW = 7;
    const MAP = generateMap();

    io.on('connection', (socket) => {

        socket.emit('setMap', MAP);

        socket.on('setPosition', (data) => { // установка значения в ячеку
            io.emit('setMap', setValCell(data));
        });

        socket.on('disconnect', () => {

        });
    });

    // Установка значения в ячеку карты
    function setValCell(data) {
        MAP[data.row][data.col] = {solid: data.solid};

        return MAP;
    }

    function generateMap() {
        const map = [];

        for (let row = 0; row < MAX_ROW; row++) {
            map[row] = [];
            for (let col = 0; col < MAX_COL; col++) {
                map[row][col] = {solid: false};
            }
        }

        return map;
    }

};