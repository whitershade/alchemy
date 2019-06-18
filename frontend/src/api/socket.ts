import io from 'socket.io-client';

class Singleton {
  protected static instance :Singleton = new Singleton;

  public socket = process.env.NODE_ENV === 'development' ?
    io('localhost:4000') :
    io();

  constructor() {
    if (Singleton.instance) {
      throw new Error("Instantiation failed: "+
        "use Singleton.getInstance() instead of new.");
    }
  }

  public static getInstance() :Singleton {
    return Singleton.instance;
  }
}

export default Singleton.getInstance().socket;