import { Slide1_Intro } from './slides/Slide1_Intro';
import { Slide2_Examples } from './slides/Slide2_Examples';
import { Slide3_Demand } from './slides/Slide3_Demand';
import { Slide4_Solutions } from './slides/Slide4_Solutions';
import { Slide5_EdgeCraft } from './slides/Slide5_EdgeCraft';
import { Slide6_BabylonAnyup } from './slides/Slide6_BabylonAnyup';
import { FloatingBubbles } from './components/FloatingBubbles';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="scroll-container">
        <section className="scene" data-scene="1">
          <Slide1_Intro />
        </section>

        <section className="scene" data-scene="2">
          <Slide2_Examples />
        </section>

        <section className="scene" data-scene="3">
          <Slide3_Demand />
        </section>

        <section className="scene" data-scene="4">
          <Slide4_Solutions />
        </section>

        <section className="scene" data-scene="5">
          <Slide5_EdgeCraft />
        </section>

        <section className="scene" data-scene="6">
          <Slide6_BabylonAnyup />
        </section>
      </div>

      <FloatingBubbles />
    </div>
  );
}

export default App;
