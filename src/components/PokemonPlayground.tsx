import React, { useState } from 'react'

type ObjectFitMode = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

interface PokemonImagePlaygroundProps {
    name: string;
    id: number | string;
    imageUrl: string;
}

export const PokemonPlayground = ({ id, imageUrl, name }: PokemonImagePlaygroundProps) => {
    const [fitMode, setFitMode] = useState<ObjectFitMode>('contain');


    return (
        <div style={{ maxWidth: 260, margin: '24px auto', fontFamily: 'sans-serif' }}>
            <h3 style={{ textAlign: 'center', marginBottom: 8 }}>
                #{id} {name}
            </h3>
            <label style={{ display: 'block', marginBottom: 8 }}>
                object-fit: {" "}
                <select
                    value={fitMode}
                    onChange={e => setFitMode(e.target.value as ObjectFitMode)}
                >
                    <option value="contain">contain</option>
                    <option value="cover">cover</option>
                    <option value="fill">fill</option>
                    <option value="none">none</option>
                    <option value="scale-down">scale-down</option>
                </select>
            </label>

            <div
                style={{
                    width: 200,
                    height: 300,
                    border: '1px solid #ccc',
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <img
                    src={imageUrl}
                    alt={name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: fitMode
                    }}
                />
            </div>

            <p style={{ marginTop: 8, fontSize: 14, textAlign: 'center' }}>
                Currnt status: <b>{fitMode}</b>
            </p>
        </div>
    )
}
