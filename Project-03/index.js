import { McpServer } from '@modelcontextprotocol/server/mcp.js';
import * as z from 'zod/v4';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio.js';


const server = new McpServer({ name: 'greeting-server', version: '1.0.0' });


server.registerTool(
    'greet',
    {
        description: 'Greet someone by name',
        inputSchema: z.object({ name: z.string() })
    },
    async ({ name }) => ({
        content: [{ type: 'text', text: `Hello, ${name}!` }]
    })
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main();