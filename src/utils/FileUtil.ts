import fs, { read } from "fs"
import readline from 'readline'


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




}