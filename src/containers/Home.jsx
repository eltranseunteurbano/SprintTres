import React, {useState, useEffect} from 'react';
import CSVReader from 'react-csv-reader';
import '../reset.css';
import './Home.scss';

const Home = () => {

    const [data, setData] = useState([]);
    const [uploadedData, setUploadedData] = useState(false);
    const [persona, setPersona] = useState([]);
    const [numPerson, setNumPerson] = useState(0);
    const [showList, setShowList] = useState([]);

    //Función donde modifico y guardo el archivo csv
    const uploadDate = ( data ) => {
       // console.log(data);
        data.shift();                  
        setData(data);                  
        setUploadedData(true);         
    }

    const getPersona = ( nombre ) => {
        data.map( ( item ) => {
            if(item[1] === nombre){
                setPersona(item);
            }
        } );
    }

    const getCosWithPerson = () => {
        persona[31] = [];
                
        data.map( ( item ) => {
            
            var AB = 0; //Producto punto AB
            var MA = 0; //Magnitud A
            var MB = 0; //Magnitub B
            var cos = 0; //Coseno

            for(let index = 2; index < 31; index ++ ){
                var multiplicacion = persona[index] * item[index];
                AB = multiplicacion + AB;

                var potenciaUno = Math.pow ( persona[index], 2);
                MA = potenciaUno + MA;
                
                var potenciaDos = Math.pow ( item[index], 2); 
                MB = potenciaDos + MB;
                
            }
            
            MA = Math.sqrt(MA);
            MB = Math.sqrt(MB);
            cos = AB / ( MA * MB );
            cos = cos*100;
            cos.toFixed(2);
            cos = Math.round(cos);

            var arregloCosenos = {
                'persona': item[1],
                'coseno': cos
            }

            persona[31].push(arregloCosenos);  
        });
    }

    const onChangeRecomendations = (number) =>{
        setNumPerson(number);
    }


    useEffect ( () => {
        getCosWithPerson();
    });

    return(
        <section className="Home">
            <CSVReader                                                                     
                cssClass="react-csv-input"                                                  
                label="Por favor, adjunte el archivo CSV que quiere visualizar"            
                onFileLoaded={uploadDate}                                                  
            />

            {uploadedData ? 
            <section className="Personas appear">

                <div className="PersonaUno">                                                                                                                     
                    <p>Seleccionar el nombre de la persona</p>
                    <select defaultValue="" name="PersonaUno" required onChange={ (event) => getPersona(event.target.value)}>
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
                    <p> Número de personas que se aparecen a <strong>{persona[1]}</strong> </p>
                    <input type="number" placeholder="Inserte el número aquí" max='24' onChange={(e) => onChangeRecomendations(e.target.value)}/>
                </div>
            </section>
            :
            ''
            }

            {
            }
        </section>
    )

}



export default Home;