import React, {useState, useEffect} from 'react';
import CSVReader from 'react-csv-reader';
import '../reset.css';
import './Home.scss';

const Home = () => {

    const [data, setData] = useState([]);
    const [uploadedData, setUploadedData] = useState(false);
    const [persona, setPersona] = useState([]);
    const [numPerson, setNumPerson] = useState();

    //Función donde modifico y guardo el archivo csv
    const uploadDate = ( data ) => {
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

        setNumPerson('');
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

            var arregloCosenos = [
                item[1],
                cos
            ]
            persona[31].push(arregloCosenos);  
        });

        var arreglo = persona[31];
        arreglo = arreglo.sort( ( a, b ) => {
            return a[1] < b[1] ? 1 : -1
        })
        arreglo.shift();
        console.log(persona[31]);
    }
    

    const onChangeRecomendations = (number) =>{
        setNumPerson(number);

        var lista = persona[31];
        persona[31] = [];

        for (let index = 0; index < number; index++) {
            persona[31].push(lista[index]);
        }
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
                        <option defaultValue="" value="" selected disabled> Seleccionar</option>
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
                    <input type="number" placeholder="Inserte el número aquí" max='24' onChange={(e) => onChangeRecomendations(e.target.value)} value={numPerson}/>
                </div>
            </section>
            :
            ''
            }
            <article className="list">

            {
                persona[31] && numPerson > 0 ?
                persona[31].map( ( item ) => {
                    return(
                        <div key={item[0]} className="list__item">
                            <p>{item[0]}</p>
                            <p>{item[1]}</p>
                        </div>
                    )
                })
                : ''
            }

            </article>
        </section>
    )

}



export default Home;