import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import PMSBuilder from './containers/PMSBuilder/PMSBuilder';

// function App() {
//   return (
    
//   );
// }

// export default App;

class App extends React.Component {

    componentDidMount () {
        if(!JSON.parse(sessionStorage.getItem('access_token'))) {
            this.props.history.push('/login')
        }
    }

    render() {
        return(
            <Layout>
                <PMSBuilder />
            </Layout>
        )
    }
}

export default App;


