document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabBar = document.querySelector('.tab-bar');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBar.addEventListener('click', (event) => {
        if (event.target.classList.contains('tab-button')) {
            const targetTab = event.target.dataset.tab;

            // Deactivate all tabs and panes
            document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Activate the clicked tab and corresponding pane
            event.target.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        }
    });

    // Discord profile functionality
    const discordUserId = '752899252866515025'; // .x.v.c. UID
    const discordProfileDiv = document.getElementById('discord-profile');

    async function fetchDiscordProfile() {
        const apiUrl = `https://avatar-cyan.vercel.app/api/${discordUserId}`;
        const defaultAvatarUrl = `https://cdn.discordapp.com/embed/avatars/${discordUserId % 5}.png?size=128`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            const profileData = {
                username: data.username || 'Explysm',
                avatar: data.avatarUrl || defaultAvatarUrl,
                status: 'Online', // Placeholder
                bio: 'Game & Web Developer (C#, GDScript, Godot)', // Placeholder
            };

            if (discordProfileDiv) {
                discordProfileDiv.innerHTML = `
                    <img src="${profileData.avatar}" onerror="this.onerror=null;this.src='${defaultAvatarUrl}';" alt="${profileData.username}'s avatar" class="discord-avatar">
                    <p><strong>Username:</strong> ${profileData.username}</p>
                    <p><strong>Bio:</strong> ${profileData.bio}</p>
                `;
            }

        } catch (error) {
            console.error('Failed to fetch Discord profile:', error);
            // Fallback to placeholders
            if (discordProfileDiv) {
                discordProfileDiv.innerHTML = `
                    <img src="${defaultAvatarUrl}" alt="Default avatar" class="discord-avatar">
                    <p><strong>Username:</strong> Explysm</p>
                    <p><strong>Bio:</strong> Game & Web Developer (C#, GDScript, Godot)</p>
                `;
            }
        }
    }

    if (discordProfileDiv) {
        fetchDiscordProfile();
    }

    // GitHub profile functionality
    const githubUsername = 'explysm';
    const githubProfileDiv = document.getElementById('github-profile');

    async function fetchGitHubProfile() {
        const apiUrl = `https://avatar-cyan.vercel.app/api/github/${githubUsername}`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const profile = await response.json();

            if (githubProfileDiv) {
                githubProfileDiv.innerHTML = `
                    <div class="github-profile-header">
                        <img src="${profile.avatarUrl}" alt="${profile.username}'s avatar" class="github-avatar">
                        <div>
                            <h3>${profile.display_name}</h3>
                            <p>@${profile.username}</p>
                        </div>
                    </div>
                    <p>${profile.bio}</p>
                    <p>
                        <strong>${profile.followers}</strong> followers &middot; 
                        <strong>${profile.following}</strong> following &middot; 
                        <strong>${profile.public_repos}</strong> repos
                    </p>
                `;
            }

        } catch (error) {
            console.error('Failed to fetch GitHub profile:', error);
            if (githubProfileDiv) {
                githubProfileDiv.innerHTML = '<p>Could not fetch GitHub profile.</p>';
            }
        }
    }

    if (githubProfileDiv) {
        fetchGitHubProfile();
    }

    // GitHub repo functionality
    const githubReposDiv = document.getElementById('github-repos');

    async function fetchGitHubRepos() {
        const apiUrl = `https://avatar-cyan.vercel.app/api/github/${githubUsername}/repos`;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const repos = await response.json();

            if (githubReposDiv) {
                if (repos.length > 0) {
                    let html = '<ul class="repo-list">';
                    repos.forEach(repo => {
                        html += `
                            <li>
                                <a href="${repo.url}" target="_blank">${repo.name}</a>
                                <p>${repo.description || 'No description'}</p>
                                <div class="repo-stats">
                                    <span>${repo.language || ''}</span>
                                    <span>⭐ ${repo.stars}</span>
                                    <span>🍴 ${repo.forks}</span>
                                </div>
                            </li>
                        `;
                    });
                    html += '</ul>';
                    githubReposDiv.innerHTML = html;
                } else {
                    githubReposDiv.innerHTML = '<p>No public repositories found.</p>';
                }
            }

        } catch (error) {
            console.error('Failed to fetch GitHub repos:', error);
            if (githubReposDiv) {
                githubReposDiv.innerHTML = '<p>Could not fetch GitHub repositories.</p>';
            }
        }
    }

    if (githubReposDiv) {
        fetchGitHubRepos();
    }

    // GIF tab functionality
    const gifContainer = document.getElementById('gif-container');
    
    async function loadGifs() {
        try {
            const response = await fetch('assets/gifs.txt');
            if (!response.ok) {
                throw new Error('Could not load gifs.txt');
            }
            const text = await response.text();
            const urls = text.split('\n').filter(url => url.trim() !== '');

            if (gifContainer) {
                if (urls.length > 0) {
                    let html = '<h3>My Favorite GIF Collection</h3>';
                    urls.forEach(url => {
                        const postId = url.split('-').pop();
                        if (postId) {
                            html += `
                                <div class="tenor-gif-embed" data-postid="${postId}" data-share-method="host" data-aspect-ratio="1.7778" data-width="100%"></div>
                            `;
                        }
                    });
                    gifContainer.innerHTML = html;
                    // Re-run Tenor's embed script if it's already loaded
                    if (window.Tenor) {
                        window.Tenor.embed();
                    }
                } else {
                    gifContainer.innerHTML = '<p>No GIFs found in gifs.txt.</p>';
                }
            }
        } catch (error) {
            console.error('Failed to load GIFs:', error);
            if (gifContainer) {
                gifContainer.innerHTML = '<p>Could not load GIFs.</p>';
            }
        }
    }

    if (gifContainer) {
        loadGifs();
    }

    // Typing animation functionality
    const typingLine1 = document.getElementById('typing-line-1');
    const typingLine2 = document.getElementById('typing-line-2');
    const text1 = "Hello! I'm Explysm, a game developer and web developer.";
    const text2 = "My primary languages are C# and GDScript, and I use Godot for my game development projects.";

    function typeWriter(element, text, i, callback) {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor"></span>';
            setTimeout(() => typeWriter(element, text, i + 1, callback), 50);
        } else {
            element.innerHTML = text; // Remove cursor when done
            if (callback) {
                callback();
            }
        }
    }

    // Start typing animation
    if (typingLine1 && typingLine2) {
        typeWriter(typingLine1, text1, 0, () => {
            typeWriter(typingLine2, text2, 0);
        });
    }
});
