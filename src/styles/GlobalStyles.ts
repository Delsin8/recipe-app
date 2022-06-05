import { createGlobalStyle } from 'styled-components'
import RalewayRegular from './fonts/Raleway-Regular.ttf'
import RalewayLight from './fonts/Raleway-Light.ttf'
import RalewayExtraLight from './fonts/Raleway-ExtraLight.ttf'
import RalewayMedium from './fonts/Raleway-Medium.ttf'

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'Raleway';
    src: local('Raleway'), url(${RalewayMedium}) format('truetype');
    font-weight: 500;
}
@font-face {
    font-family: 'Raleway';
    src: local('Raleway'), url(${RalewayRegular}) format('truetype');
    font-weight: 400;
}
@font-face {
    font-family: 'Raleway';
    src: local('Raleway'), url(${RalewayLight}) format('truetype');
    font-weight: 300;
}
@font-face {
    font-family: 'Raleway';
    src: local('Raleway'), url(${RalewayExtraLight}) format('truetype');
    font-weight: 200;
}

body {
    margin: 0;
    background-color: #DDBEA8;
    font-family: Raleway;

    a {
        color: black;
        text-decoration: none;
    }

    // link
    .link {
        color: black;
        text-decoration: none;
    }

    //frame
    .frame {
        background: #F3DFC1;
        padding: 1px 2px;
    } 

    // flex
    .flex {
        display: flex;
    }
    
    .direction-column {
        flex-direction: column;
    }

    .justify-center {
        justify-content: center;
    }

    .align-center {
        align-items: center;
    }
    .align-end {
        align-items: end;
    }

    .gap-tiny {
        gap: 0.25rem;
    }
    .gap-small {
        gap: 0.5rem;
    }
    .gap-medium {
        gap: 0.75rem;
    }
    .gap-large {
        gap: 1rem;
    }

    .wrap {
        flex-wrap: wrap;
    }

    // display
    .inline-block {
        display: inline-block;
    }
    
    // position
    .pos-relative {
        position: relative;
    }

    // 
    .text-center {
        text-align: center;
    }

    // margins
    .margin-top-4 {
        margin-top: 1rem;
    }

    // sizes
    .fsize-negative-2 {
        font-size: 0.75rem;
    }
    .fsize-negative-3 {
        font-size: 0.5rem;
    }
    .fsize-negative-4 {
        font-size: 0.25rem;
    }
    
    .fsize-1 {
        font-size: 1rem;
    }
    .fsize-2 {
        font-size: 1.25rem;
    }
    .fsize-3 {
        font-size: 1.5rem;
    }

    // font weights
    .weight-extra-light {
        font-weight: 200;
    }
    .weight-light {
        font-weight: 300;
    }
    .weight-regular {
        font-weight: 400;
    }
    .weight-medium {
        font-weight: 500;
    }

    // pointer
    .pointer {
        cursor: pointer;
    }

    // text decorations
    .text-underline {
        text-decoration: underline;
    }
}
`

export default GlobalStyles
