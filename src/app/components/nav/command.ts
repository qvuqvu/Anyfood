// Define an interface for the receiver object
interface Receiver {
  performAction(): void;
}

class Command {
  private receiver!: Receiver;

  execute(): void {
    // Implement the command logic
    this.receiver.performAction();
  }
}

export default Command;
