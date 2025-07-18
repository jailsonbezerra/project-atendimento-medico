// Exemplo de hook customizado para campos controlados (pode ser expandido conforme necessidade) 
import { useState } from 'react';

export function useFormFields(initialState) {
    const [fields, setFields] = useState(initialState);
    const handleFieldChange = e => {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: value }));
    };
    return [fields, handleFieldChange, setFields];
}
