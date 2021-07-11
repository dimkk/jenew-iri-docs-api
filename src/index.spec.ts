import {getLastAndExpectedDigit, isNeededListItem, pdfParser} from './index'

// describe('pdfParser()', () => {
//     it('tests', () => {
//         pdfParser()
//         expect(true).toBe(true)
//     })
// })

describe('this will test getLastAndExpectedDigit', () => {
    it('last digit 1.2.3. fsafas', () => {
        const str = '1.2.3. fsafsa'
        expect(getLastAndExpectedDigit(str)?.lastDigit).toBe(3)
    })
    it('expected digit +1 1.2.3.', () => {
        const str = '1.2.3.'
        expect(getLastAndExpectedDigit(str)?.expectedDigit).toBe(4)
    })
    it('last digit 10.15.24.', () => {
        const str = '10.15.24.'
        expect(getLastAndExpectedDigit(str)?.lastDigit).toBe(24)
    })
    it('expected digit +1 10.15.24.', () => {
        const str = '10.15.24.'
        expect(getLastAndExpectedDigit(str)?.expectedDigit).toBe(25)
    })
    it('expected null fsafsaf', () => {
        const str = 'fsafsaf'
        expect(getLastAndExpectedDigit(str)).toBe(null)
    })
    it('should not fail 1. Общие положен', () => {
        const str = '1. Общие положен'
        expect(getLastAndExpectedDigit(str)?.lastDigit).toBe(1)
    })
})


describe('this will test isNeededListItem', () => {
    it('should return true for 1.2.3.', () => {
        const str = '1.2.3. '
        expect(isNeededListItem(str)).toBe(true)
    })
    it('should return true for 9.9.', () => {
        const str = '9.9.'
        expect(isNeededListItem(str)).toBe(true)
    })
    it('should return true for 92.93.45.', () => {
        const str = '92.93.45.'
        expect(isNeededListItem(str)).toBe(true)
    })
    it('should return false for 223', () => {
        const str = '223'
        expect(isNeededListItem(str)).toBe(false)
    })
})

