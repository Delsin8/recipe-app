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

    // link
    .link {
        background: #F3DFC1;
        padding: 1px 2px;
        color: black;
        text-decoration: none;
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

    .gap-small {
        gap: 0.5rem;
    }
    .gap-medium {
        gap: 0.75rem;
    }
    .gap-large {
        gap: 1rem;
    }

    // 
    .text-center {
        text-align: center;
    }

    // margins
    .margin-top-4 {
        margin-top: 1rem;
    }
}
`

export default GlobalStyles
