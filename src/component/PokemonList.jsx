import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPokemon(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Filter the Pokémon based on the search term
    const filteredPokemon = pokemon.filter((p) =>
        p.name.toLowerCase().includes(searchTerm)
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <nav className="navbar">
                <h1 className="navbar-title">Pokémon List</h1>
                <input
                    type="text"
                    placeholder="Search Pokémon"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="navbar-search"
                />
            </nav>
            <div className="pokemon-list">
                {filteredPokemon.map((p) => (
                    <PokemonCard key={p.name} pokemonUrl={p.url} />
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
