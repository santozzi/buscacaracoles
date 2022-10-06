export class LogicaContext {
    private totalSnails: number;
    private totalNumbers: number;
    private totalSpiders: number
    private static context: LogicaContext | null = null;

    private constructor() {
        this.totalSnails = 0;
        this.totalNumbers = 0;
        this.totalSpiders = 0;
    }

    public static StartContext(): LogicaContext {
        if (this.context === null) {
            this.context = new LogicaContext();
        }
        return this.context;
    }
    public getTotalCaracoles(): number {
        return this.totalSnails;
    }
    public getTotalNumeros(): number {
        return this.totalNumbers;

    }
    public getTotalSpiders(): number {
        return this.totalSpiders;
    }
    public incrementSnail() {
        this.totalSnails++;
    }
    public decrementSnail() {
        this.totalSnails--;
    }
    public incrementNumber() {
        this.totalNumbers++;
    }
    public decrementNumber() {
        this.totalNumbers--;
    }
    public incrementSpider() {
        this.totalSpiders++;
    }
    public decrementSpider() {
        this.totalSpiders--;
    }
    public reset() {
        this.totalNumbers = 0;
        this.totalSnails = 0;
        this.totalSpiders = 0;
    }


}