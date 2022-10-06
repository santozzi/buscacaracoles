import { Point } from '../interfaces/interfaces';

//genera de forma aleatoria las spaiders y su ubicación
export const SpawnerSpiders = (maxSpider: number, maxX: number, maxY: number): Array<Point> => {
    let spiders: Array<Point> = [];
    let cont = 0;
    while (cont < maxSpider) {
        let x = Math.floor(Math.random() * (maxX + 1));
        let y = Math.floor(Math.random() * (maxY + 1));
        let spider: Point | null | undefined = spiders.find((spider: Point) => {
            return spider?.x === x && spider?.y === y;
        });
        if (spider === null || spider === undefined) {
            spiders.push({ x, y });
            cont++;
        }
    }
    return spiders;
}