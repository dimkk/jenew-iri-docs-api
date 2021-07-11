import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js'
import ol2json from 'ol-to-json'

export const pdfParser = async () => {
    const path =
        './public/res/pdf/session3/Положение о Конкурсном отборе (прием заявок с 18-03-2021).pdf'
    const pdf = await pdfjsLib.getDocument({
        url: path,
        verbosity: 0,
    }).promise
    let fullText = ''
    for (let i = 1; i <= pdf.numPages; i++) {
        let page = await pdf.getPage(i)
        let text = await page.getTextContent()
        let prevText: any
        let currentNumber: any = ''
        text.items.map((i, idx) => {
            //console.log(i)
            if (prevText) {
                //console.log({i, prevText})
                if (i.transform[5] == prevText.transform[5]) {
                    prevText.str += i.str
                    //console.log(prevText.str)
                } else {
                    fullText += prevText.str + '\r\n'
                    prevText = i
                }
            } else {
                prevText = i
            }
        })
        //console.log(fullText)

        let data: any = {}
        data = ol2json(fullText, '\r\n')
        console.log(data)
        // console.log(data.text)
    }
}
pdfParser()

interface ILastAndExpected {
    lastDigit: number
    expectedDigit: number
}

export const getLastAndExpectedDigit = (
    str: string
): ILastAndExpected | null => {
    if (!str) {
        console.log('getLastAndExpectedDigit: empty string to process')
        return null
    }
    try {
        let numbers = str.split('.')
        if (numbers.length < 2) return null
        let lastDigit = parseInt(numbers[numbers.length - 2])
        let expectedDigit = lastDigit + 1
        return { lastDigit, expectedDigit }
    } catch (ex) {
        console.log(`getLastAndExpectedDigit: ex ${ex}`)
        return null
    }
}
