
    import React, {Component} from 'react';
    import architecture from '../../assets/3TierArch.png'

    class Home extends Component {
        render () {
        return (
            <div>
            <p style={{ color: "white", position: "absolute", top: 0, left: 0 }}>Nguyen Khanh Nam</p>
            <h1 style={{color:"white"}}>AWS 3-TIER WEB APP DEMO</h1>
            <img src={architecture} alt="3T Web App Architecture" style={{height:400,width:825}} />
          </div>
        );
      }
    }

    export default Home;