class Agente {
    constructor(nombre, rol, habilidades, imagen) {
        this.nombre = nombre;
        this.rol = rol;
        this.habilidades = habilidades;
        this.imagen = imagen;
    }
}

async function getAgents() {
    try {
        const response = await fetch("https://valorant-api.com/v1/agents");
        const data = await response.json();
        
        return data.data.map(agentData => {
            return new Agente(
                agentData.displayName,
                agentData.role ? agentData.role.displayName : "Sin rol",
                agentData.abilities.map(ability => ability.displayName),
                agentData.displayIcon
            );
        });
    } catch (error) {
        console.error("Error al obtener los agentes:", error);
    }
}

function renderAgents(agents) {
    const agentsContainer = document.getElementById("agentsContainer");
    agentsContainer.innerHTML = ""; 

    agents.forEach(agent => {
        const agentDiv = document.createElement("div");
        agentDiv.classList.add("agent");

        agentDiv.innerHTML = `
            <img src="${agent.imagen}" alt="${agent.nombre}">
            <h2>${agent.nombre}</h2>
            <p><strong>Rol:</strong> ${agent.rol}</p>
            <ul>
                ${agent.habilidades.map(habilidad => `<li>${habilidad}</li>`).join("")}
            </ul>
        `;

        agentsContainer.appendChild(agentDiv);
    });
}

function setupSearch(agents) {
    const searchInput = document.getElementById("searchInput");
    
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredAgents = agents.filter(agent =>
            agent.nombre.toLowerCase().includes(searchTerm)
        );
        renderAgents(filteredAgents);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const agents = await getAgents();
    renderAgents(agents);
    setupSearch(agents);
});
