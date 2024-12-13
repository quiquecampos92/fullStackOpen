import React from 'react'

export function Blog({ blog }) {
    return (
        <div>
            {blog.title} {blog.author}
        </div>
    )
}
