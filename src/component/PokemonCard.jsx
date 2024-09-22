import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

const PokemonCard = ({ pokemonUrl }) => {
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(pokemonUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon data');
                }
                const data = await response.json();
                setPokemonData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, [pokemonUrl]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <motion.div 
            className="pokemon-card"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <h3>{pokemonData.name}</h3>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </motion.div>
    );
};

export default PokemonCard;
