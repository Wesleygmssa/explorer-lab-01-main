import "./css/index.css"
import IMask from 'imask'
const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
    const colors = {
        visa: ["#436D99", "#2D57F2"],
        mastercard: ["#DF6F29", "#C69347"],
        default: ["black", "gray"],
    }
    ccBgColor01.setAttribute("fill", colors[type][0])
    ccBgColor02.setAttribute("fill", colors[type][1])
    ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

const securityCode = document.querySelector("#security-code")
const securutyCodePattern = {
    mask: "0000"
}

const securityCodeMasked = IMask(securityCode, securutyCodePattern)

const experrationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
        },
        YY: {
            mask: String(new Date().getFullYear()).slice(2),
            from: String(new Date().getFullYear() + 10).slice(2),
            to: 31,
        }
    }
}
const expirationDateMasked = IMask(experrationDate, expirationDatePattern)
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
    mask: [{
        mask: IMask.MaskedRange,
        regex: /^4\d{0,15}/,
        cardtype: "visa",
    }, {
        mask: IMask.MaskedRange,
        regex: /(^5[1-5\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
        cardtype: "mastercard",
    }, {
        mask: IMask.MaskedRange,
        cardtype: "default",
    }],
    dispatch: function(appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g,
            "")
        const foundMask = dynamicMasked.compiledMask.find(function(item) {
            return number.match(item.regex)
        })

        return foundMask ? foundMask.value : undefinedExports
    }

}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)