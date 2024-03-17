import React, { useState } from 'react';
import axios from 'axios';

const CacheForm = () => {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [duration, setDuration] = useState('');
    const [getResponse, setGetResponse] = useState('');
    const [error, setError] = useState('');

    const handleSetSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.get(`https://lru-cache-lmmq.onrender.com/set`, { params: { key, value, duration: `${duration}s` } });
            setKey('');
            setValue('');
            setDuration('');
            alert(`Key "${key}" set successfully`);
        } catch (err) {
            setError('Failed to set value');
        }
    };

    const handleGetSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.get(`https://lru-cache-lmmq.onrender.com/get`, { params: { key } });
            setGetResponse(`Value: ${response.data.value}`);
        } catch (err) {
            setError('Failed to get value or key not found');
        }
    };

    return (
        <div className="max-w-md mx-auto my-10">
            <h2 className="text-2xl font-bold mb-4">Set Key-Value in Cache</h2>
            <form onSubmit={handleSetSubmit} className="mb-8">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Key"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Duration (seconds)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Set</button>
            </form>

            <h2 className="text-2xl font-bold mb-4">Get Value by Key</h2>
            <form onSubmit={handleGetSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Key"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">Get</button>
            </form>

            {getResponse && <p className="mt-4">{getResponse}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default CacheForm;
