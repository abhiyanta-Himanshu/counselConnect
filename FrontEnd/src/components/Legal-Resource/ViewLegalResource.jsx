/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LEGAL_RESOURCES_API_END_POINT } from '../../utils/constant.js';
import { toast } from 'sonner';
import { Link } from "react-router-dom"

const LegalResources = () => {
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${LEGAL_RESOURCES_API_END_POINT}/all`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    toast.success(res.data.message)
                    setResources(res.data.legalResources);
                    setLoading(false);
                    // filter(resources)
                }

            } catch (error) {
                toast.error('Failed to fetch legal resources');
                setLoading(false);
            }
        };

        fetchResources();
    }, []);


    // Filtering Logic in Frontend
    useEffect(() => {
        const filterResources = () => {
            const filtered = resources.filter((resource) => {
                const matchesSearchQuery = resource.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                const matchesFilterType = filterType
                    ? resource.type === filterType
                    : true;

                return matchesSearchQuery && matchesFilterType;
            });
            setFilteredResources(filtered);
        };

        filterResources();
    }, [resources, searchQuery, filterType]);


    // const filter = (resources) => {
    //     const filteredResources = resources.filter((resource) => {
    //         const matchesSearchQuery = resource.title
    //             .toLowerCase()
    //             .includes(searchQuery.toLowerCase());
    //         const matchesFilterType = filterType
    //             ? resource.type === filterType
    //             : true;

    //         return matchesSearchQuery && matchesFilterType;
    //     });
    // }

    return (
        <div className="container mx-auto p-8">
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl font-bold mb-4">Legal Resources</h1>
                <Link to={'/legal-resources/create'}
                    className='bg-blue-400 p-2 rounded-lg text-white hover:bg-blue-300'
                >
                    Create
                </Link>
            </div>


            {/* Search and Filter Section */}
            <div className="mb-4">
                <input
                    type="text"
                    className="border p-2 w-full"
                    placeholder="Search legal resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="border p-2 w-full mt-2"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="court_order">Court Orders</option>
                    <option value="article">Articles</option>
                    <option value="law">Laws</option>
                    <option value="others">Others</option>
                </select>
            </div>

            {/* Display Resources */}
            {loading ? (
                <p>Loading...</p>
            ) : resources.length === 0 ? (
                <p>No legal resources found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredResources.map((resource) => (
                        <div key={resource._id} className="p-4 border rounded-lg shadow">
                            <h2 className="text-xl font-bold">{resource.title}</h2>
                            <p>{resource.description}</p>
                            <a href={resource.link} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                                View Resource
                            </a>
                            <p className="text-sm">Type: {resource.type}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LegalResources;
