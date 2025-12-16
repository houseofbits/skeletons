


export default class TileOccupancyService {
    private tileOccupancy: Array<Array<number | null>> = [
        [1, 2, 3],
        [4, 5, 5]
    ];

    getTiles() {
        return this.tileOccupancy;
    }

    private isAllTilesOccupied(): boolean {
        return this.tileOccupancy.every(row => row.every(tile => tile != null));
    }

    private getRandomTile(): { x: number, y: number } {
        const height = 2;
        const width = 3;

        const y = Math.floor(Math.random() * height);
        const x = Math.floor(Math.random() * width);

        return { x, y };
    }

    private getMoveDirection(x: number, y: number) {
        if (!this.tileOccupancy[y] || this.tileOccupancy[y][x] === null) {
            return null;
        }
        const height = 2;
        const width = 3;
        const source = this.tileOccupancy[y][x];

        const dirs = [
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 }
        ];

        for (const dir of dirs) {
            const nx = x + dir.dx;
            const ny = y + dir.dy;

            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
                continue;
            };

            if (!this.tileOccupancy[ny]) {
                return null;
            }

            const target = this.tileOccupancy[ny][nx];
            if (target === source) {
                return {
                    x: nx,
                    y: ny
                };
            }
        }

        for (const dir of dirs) {
            const nx = x + dir.dx;
            const ny = y + dir.dy;

            if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
                continue;
            };

            if (!this.tileOccupancy[ny]) {
                return null;
            }

            const target = this.tileOccupancy[ny][nx];
            if (target === null) {
                return {
                    x: nx,
                    y: ny
                };
            }
        }

        return null;
    }

    private moveTile(sx: number, sy: number, tx: number, ty: number, copy: boolean = true, moveCallback: CallableFunction = () => { }) {
        if (!this.tileOccupancy[sy] || !this.tileOccupancy[ty] || this.tileOccupancy[ty][tx] === undefined) {
            return;
        }

        const id = this.tileOccupancy[sy][sx];
        if (!id) {
            return;
        }

        this.tileOccupancy[ty][tx] = id;

        if (!copy) {
            this.tileOccupancy[sy][sx] = null;
        }

        moveCallback(id, sx, sy, tx, ty, copy);
    }

    resolveTiles(moveCallback: CallableFunction = () => { }) {
        let areAllTilesOccupied = this.isAllTilesOccupied();
        while (true) {
            const r = this.getRandomTile();

            const move = this.getMoveDirection(r.x, r.y);
            if (move === null) {
                continue;
            }

            this.moveTile(r.x, r.y, move.x, move.y, !areAllTilesOccupied, moveCallback);
            areAllTilesOccupied = Math.random() < 0.5;

            if (this.isAllTilesOccupied()) {
                return;
            }
        }
    }
}