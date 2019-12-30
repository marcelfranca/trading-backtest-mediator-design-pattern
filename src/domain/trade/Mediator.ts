class Mediator {
  constructor(private handlers: any = []) {}

  addHandler(handler: any) {
    if (this.isValidHandler(handler)) {
      this.handlers.push(handler);
      return this;
    }
    let error: any = new Error(
      "Attempt to register an invalid handler with the mediator."
    );
    error.handler = handler;
    throw error;
  }

  isValidHandler(handler: any) {
    return (
      typeof handler.canHandle === "function" &&
      typeof handler.handle === "function"
    );
  }

  request(index: string, value: any) {
    for (let i = 0; i < this.handlers.length; i++) {
      let handler: any = this.handlers[i];
      if (handler.canHandle(value)) {
        return handler.handle(index, value);
      }
    }
    return { pair: index, error: "Mediator was unable to satisfy request." };
  }
}
export default new Mediator();
