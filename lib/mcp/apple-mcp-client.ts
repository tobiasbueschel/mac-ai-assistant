import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio";
import { experimental_createMCPClient } from "ai";

let appleMCPClient: Awaited<
  ReturnType<typeof experimental_createMCPClient>
> | null = null;

export async function getAppleMCPClient() {
  if (!appleMCPClient) {
    try {
      // Initialize an MCP client to connect to the Apple MCP server via stdio
      const transport = new StdioClientTransport({
        command: "npx",
        args: ["--no-cache", "@dhravya/apple-mcp@latest"],
      });

      appleMCPClient = await experimental_createMCPClient({
        transport,
      });
    } catch (error) {
      console.error("Failed to initialize Apple MCP client:", error);
      throw error;
    }
  }

  return appleMCPClient;
}

export async function getAppleMCPTools() {
  try {
    const client = await getAppleMCPClient();
    const tools = await client.tools();
    return tools;
  } catch (error) {
    console.error("Failed to get Apple MCP tools:", error);
    // Return empty tools object if MCP client fails
    return {};
  }
}

export async function closeAppleMCPClient() {
  if (appleMCPClient) {
    try {
      await appleMCPClient.close();
      appleMCPClient = null;
    } catch (error) {
      console.error("Failed to close Apple MCP client:", error);
    }
  }
}
