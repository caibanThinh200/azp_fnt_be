import chalk from 'chalk';

const colorsType = {
    success: chalk.bgGreen.black,
    default: chalk.bgGray.white,
    error: chalk.bgRed.white
}

class Logger {
    static instance;
    static message;
    static type;
    
    // constructor() {
    //     this.getLog(this.message, this.type);
    // }

    static getInstance(message, type) {
        this.message = message;
        this.type = type;
        if(!this.instance) {
            this.instance = new Logger();
        }
        return Logger.instance;
    }
    
    getLog(message, type) {
        switch(type) {
            case "success": {
                console.log(colorsType.success(message));
                break;
            }
            case "error": {
                console.log(colorsType.error(message));
                break;
            }
            default: console.log(colorsType.default(message))
        }
    }
}

export default Logger;