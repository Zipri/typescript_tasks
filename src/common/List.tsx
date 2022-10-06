import React from 'react';

interface LProps<T> {
    items: T[],
    renderItem: (item: T) => React.ReactNode
}

export default function List<T> (props: LProps<T>) {
    return <div>
        {props.items.map(props.renderItem)}
    </div>
}