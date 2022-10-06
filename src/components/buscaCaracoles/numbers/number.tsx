import React from 'react';
import './number.css';



interface Color {
    one: string,
    two: string,
    three: string,
    four: string,
    five: string,
    six: string,
    seven: string,
    eight: string,
    nine: string,
    zero: string
}

interface Props {
    colors: Color;
    number: number
}

export const Number = (props: Props) => {
    const { colors, number } = props;

    let color = '#000000';
    switch (number) {
        case 1: color = colors.one;
            break;
        case 2: color = colors.two;
            break;
        case 3: color = colors.three;
            break;
        case 4: color = colors.four;
            break;
        case 5: color = colors.five;
            break;
        case 6: color = colors.six;
            break;
        case 7: color = colors.seven;
            break;
        case 8: color = colors.eight;
            break;
        case 9: color = colors.nine;
            break;
        case 0: color = colors.zero;
            break;
        default:
            color = '#000000';
            break;

    }

    const numberContainer = {

        fontSize: '30px',
        color: color

    }
    return (
        <div className='number-container' style={numberContainer}>
            {number}
        </div>
    )
}
Number.defaultProps = {
    colors: {
        one: '#0001EB',
        two: '#126D0D',
        three: '#F00409',
        four: '#020173',
        five: '#740203',
        six: '#097872',
        seven: '#597572',
        eight: '#5a7c7c',
        nine: '#097872',
        zero: '#097872'
    }
}

