import fs, { read } from "fs"
import readline from 'readline'
import { FZ_FILENAME } from "../constants"


export default class FileUtil {
    
    private static getReadInterface(fileName: string): readline.Interface  {
        const fileStream = fs.createReadStream(fileName)
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        })

        return rl
    }

    public static async fileToCells(fileName: string) {
        const rl = this.getReadInterface(fileName)
        let cells: number[][] = []

        for await (const line of rl) {
            const row = line.split("").map(cell => parseInt(cell))
            cells.push(row)
        }

        return cells
    }

    public static cellsToFile(fileName: string, cells: number[][]) {
        if (!cells) return
        const isFileExist = fs.existsSync(fileName)
        if (isFileExist) fs.unlinkSync(fileName)

        cells.forEach(row => {
            row.forEach(cell => {
                fs.appendFileSync(fileName, `${cell}`)
            })
            fs.appendFileSync(fileName, "\n");
        })
    }

    public static async deleteCells({posX, posY, entity}: {posX: number, posY: number, entity: number}) {
        const map: number[][] = await this.fileToCells(FZ_FILENAME)
        const updatedMap = map.map((row, indexY) => {
            if (indexY === posY) {
                row.map((cell, indexX) => indexX === posX ? entity  : cell )
            }
            return row
        })
        this.cellsToFile(FZ_FILENAME, updatedMap)
    }




}