import { Component } from 'react'

type Props = { url: string, classNameImage?: string, className?: string }

type State = {
  audio: HTMLAudioElement | null,
  playing: boolean,
}

class AudioPlay extends Component<Props, State>{
  private time_listen: number;
  private interval: any;

  constructor(props: Props) {
    super(props)
    this.time_listen = 0;
    this.interval = null;
    this.state = {
      audio: null,
      playing: false,
    }
  }

  async componentDidMount() {
    const { url } = this.props;
    const audio = new Audio(url);
    await audio.load();
    this.setState({ audio });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextState.audio != this.state.audio) return true
    if (nextProps.url != this.props.url) return true
    if (nextState.playing != this.state.playing) return true
    return false
  }

  componentDidUpdate(_: Props, prevState: State) {
    const { audio, playing } = this.state;

    if (prevState.playing !== playing) {
      if (playing) {
        this.interval = setInterval(() => {
          if (audio) {
            this.time_listen += 1;
            if (this.time_listen > Math.floor(audio.duration)) {
              this.time_listen = 0;
              this.setState({ playing: false });
            }
          }
        }, 1000);
      } else {
        clearInterval(this.interval);
      }
    }

    if (prevState.audio !== audio) {
      if (prevState.audio && prevState.playing) {
        prevState.audio.pause();
      }
    }
  }

  componentWillUnmount(){
    this.state.audio?.pause();
    clearInterval(this.interval);
  }

  togglePlay() {
    if (this.state.audio) {
      if (!this.state.playing) {
        this.state.audio?.play();
        this.setState({ playing: true });
      } else {
        this.state.audio?.pause();
        this.setState({ playing: false });
      }
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className={`${this.props.className}  cursor-pointer`}>
        <span onClick={() => { this.togglePlay()}} className="">
          {/* {playing ? <IoMdPause /> : <FaPlay />} */}
          {this.state.playing ? (
            <img className={`w-7 h-7 ${this.props.classNameImage}`} src="/listening.png" />
          ) : (
            <img className={`w-7 h-7 ${this.props.classNameImage}`} src="/pause.png" />
          )}
        </span>
      </div>
    )
  }
}


export default AudioPlay;
