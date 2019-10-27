import React, {useState, useEffect} from 'react';
import CSVReader from 'react-csv-reader';
import '../reset.css';
import './Home.css';

const Home = () => {

    const [data, setData] = useState([]);
    const [uploadedData, setUploadedData] = useState(false);
    const [personaUno, setPersonaUno] = useState([]);
    const [personaDos, setPersonaDos] = useState([]);
    const [coseno, setCoseno] = useState(0);

    const inputPersonsValue = React.createRef();

    //Función donde modifico y guardo el archivo csv
    const uploadDate = ( data ) => {
        console.log(data);
        data.shift();                  
        setData(data);                  
        setUploadedData(true);         
    }

   

    const getPersona = ( nombre ) => {
        data.map( ( item ) => {                                     
            if(item[1] === nombre){                                
                setPersonaUno(item)
            }
        });
    }
    
    useEffect( () =>{                                               
        //getCoseno(); 
        console.log(inputPersonsValue)                                               
    });

    return(
        <section className="Home">
            <CSVReader                                                                     
                cssClass="react-csv-input"                                                  
                label="Por favor, adjunte el archivo CSV que quiere visualizar"            
                onFileLoaded={uploadDate}                                                  
            />

            <section className={ uploadDate ? "Personas appear" : "Personas"}>

                <div className="PersonaUno">                                                                                                                     
                    <p>Seleccionar el nombre de la persona</p>
                    <select defaultValue="" name="PersonaUno" required onChange={ (name) => { getPersona(name.target.value)}}>
                        <option defaultValue="." value="." selected> Seleccionar</option>
                        {
                            data.map ( ( item ) => {
                                return(
                                    <option value={item[1]} key={item[1]}>{item[1]}</option>                                          
                                )                                                                                                     
                            })
                        }
                        
                    </select>
                </div>

                <div className="InputPersonas">
                    <p> Número de personas que se aparecen a <strong>{personaUno[1]}</strong> </p>
                    <input type="number" ref={inputPersonsValue}/>
                </div>
            </section>
        </section>
    )

}



export default Home;