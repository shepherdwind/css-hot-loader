import './App.scss';

class App {
  public static config() {
    return {
      a : 'a',
      b : 'b',
      c : 'c'
    };
  }

  constructor() {
    console.log('there foo xx');
  }
}

export default new App();
