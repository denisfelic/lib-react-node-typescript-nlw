import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import api from '../../services/api';
import { LeafletMouseEvent, latLng } from 'leaflet';
//Visuals
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logo from '../../assets/logo.svg';

interface Item {    // Sempre que usar useState em Arrays e Objetos, precisa declara os tips dos mesmo.
    id: number;
    image_url: string;
    name: string;

}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CreatePoints = () => {
    const [items, setItems] = useState<Item[]>([]);

    const [ufs, setUfs] = useState<String[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [city, setCity] = useState<String[]>([]);
    const [selectedCity, setSelectedCity] = useState('0');

    const [currentPosition, setCurrentPosition] = useState<[number, number]>([0, 0]);
    const [selectedMapPosition, setSelectedMapPosition] = useState<[number, number]>([0, 0]);
    const [selectedItems, setSelectedItems] = useState<Number[]>([]);
    const [formData, setFormdata] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const currentLat = position.coords.latitude;
            const currentLong = position.coords.longitude;
            setCurrentPosition([currentLat, currentLong]);
            setSelectedMapPosition([currentLat, currentLong]);
        });
    }, []);

    useEffect(() => {
        api.get('items').then(resp => {
            setItems(resp.data);

        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then((response) => {
                const initialsUf = response.data.map(uf => uf.sigla);
                setUfs(initialsUf);
            });
    }, []);


    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then((response) => {
                const cityResp = response.data.map(mun => mun.nome);
                setCity(cityResp);

            })
    }, [selectedUf]);

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedUf(event.target.value);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(event.target.value);
    }

    function handleLeafletMouseMap(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng
        setSelectedMapPosition([lat, lng]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {

        const { name, value } = event.target;
        setFormdata({ ...formData, [name]: value });

    }

    function handleChangeItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);

        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const { name, email, whatsapp } = formData;
        const [latitude, longitude] = currentPosition;
        const cityToData = selectedCity;
        const uf = selectedUf;

        const myData = {
            name: name,
            email: email,
            whatsapp: whatsapp,
            latitude: latitude,
            longitude: longitude,
            city: cityToData,
            uf: uf,
            street: "-",
            number: "-",
            cep: "00000000",
            items: selectedItems
        }
        await api.post('/points', myData);
        alert('Ponto cadastrado com sucesso!');
        history.push('/');
    }
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Logo" />
                <Link to="/">
                    <FiArrowLeft />
                    <strong>Voltar para a home</strong>
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br />ponto de coleta.</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input type="text"
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-Mail</label>
                            <input type="email"
                                id="email"
                                name="email"
                                onChange={handleInputChange}
                                required
                            />

                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                                required
                            />

                        </div>
                    </div>
                </fieldset>



                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço</span>
                    </legend>

                    <Map center={currentPosition} zoom={14} onClick={handleLeafletMouseMap}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedMapPosition} />
                    </Map>


                    <div className="field-group">
                        <div className="field">

                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectedUf}>

                                <option value="0">Selecione uma UF</option>
                                {ufs.map((uf, indice) => (
                                    <option key={String(indice)} value={String(uf)} >{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">

                            <label htmlFor="city">Cidade</label>
                            <select name="city"
                                id="city"
                                onChange={handleSelectedCity}
                                value={selectedCity}>

                                <option value="0">Selecione um município</option>
                                {city.map((municipio, key) => (
                                    <option key={key} value={String(municipio)} >{municipio}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                    </legend>

                    <ul className="items-grid">
                        {items.map((item, key) => (
                            <li key={key}
                                onClick={() => handleChangeItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt="Óleo de Cozinha" />
                                <span>{item.name}</span>
                            </li>
                        ))}

                    </ul>
                </fieldset>

                <button type="submit">Cadastrar Ponto de Coleta</button>
            </form>
        </div>
    );
}

export default CreatePoints;
