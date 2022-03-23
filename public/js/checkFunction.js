checkout = {
    checkCPF(cpf){
        const digits = cpf.replace(/\D+/g, "")
        if(digits.length != 11){
            return console.log("CPF Inválido")
        } else {
            const cpfValidated = parseInt(digits)
            return cpfValidated
        }
    },
    checkRG(rg) {
        const digits = rg.replace(/\D+/g, "")
        if (digits.length != 9) {
            return console.log("RG Inválido")
        } else {
            const rgValidated = parseInt(digits)
            return rgValidated
        }
    },
    checkNIS(nis) {
        if(nis != "Pendente"){
            const digits = nis.replace(/\D+/g, "")
            if (digits.length != 11) {
                return console.log("NIS Inválido")
            } else {
                const nisValidated = parseInt(digits)
                return nisValidated
            }
        } else {
            const nisValidated = 0
            return parseInt(nisValidated)
        }
    },
    checkCel(cell){
        const digits = cell.replace(/\D+/g, "")
        if (9 < digits.length > 11) {
            return console.log("Cel Inválido")
        } else {
            const cellValidated = parseInt(digits)
            return cellValidated
        }
    }
}

module.exports = checkout