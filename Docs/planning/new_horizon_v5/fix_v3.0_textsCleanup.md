
# Main Page Text Headers (in order of appearance)

1. **OUR MISSION**
   - Subtitle: "Transforming development through AI innovation and community collaboration."
   - Location: Above MissionStatement component
   - Section ID: "about"

   *action* > delete OUR MISSION
             move - Subtitle: "Transforming development through AI innovation and community collaboration."
             into MissionStatement component (under component Our mission)
            

2. **WHY AI-POWERED DEV?**
   - Subtitle: "Harnessing intelligent agents to solve complex coding challenges with speed and precision."
   - Location: Above WhyAIDevCards component
   - Section ID: "agent-powered"

   *action* delete both title and subtitle (we have already in the component)

3. **OUR SERVICES**
   - Subtitle: "A constellation of solutions to power your development workflow."
   - Location: Above ServicesOrbital component
   - Section ID: "services"

   *action* delete title, move subtitle into ServicesOrbital component under existing "Our services"

4. **FEATURED PROJECTS**
   - Subtitle: "Discover our latest innovations and client success stories."
   - Location: Above FeaturedProjects component
   - Section ID: "projects"

   *action* delete header inside FeaturedProjects component and move in to it the header and subtitle from the page

5. **MISSION LOGBOOK**
   - Subtitle: "Documenting our journey through the code universe."
   - Location: Above ProjectsLogbook component
   - Section ID: "projects-logbook"

   *action* no action here all good

6. **JOIN OUR WORLD**
   - Subtitle: "Be part of a growing community of developers, innovators, and creators."
   - Location: Above CommunityHub component
   - Section ID: "community"

   *action* no action here all good


7. **HEAR FROM OUR AI**
   - Subtitle: "What our artificial teammates have to say about working with us."
   - Location: Above HearFromAI component
   - Section ID: "testimonials"

   *action* here we have 3 texts- go into HearFromAI component and delete two titels - bring into component both title and subtitle from the page (result is 1 set, now three, and using the one from the page)

8. **REACH OUT**
   - Subtitle: "Let's build something amazing together."
   - Location: Above ContactTerminal component
   - Section ID: "contact"

   *action* non all good here

Each header is styled consistently using the SectionHeader component, which provides:
- Large, bold text (3xl on mobile, 4xl-5xl on larger screens)
- Text color: white
- Drop shadow for better visibility
- Subtitle in purple-300 color with medium font weight
- Fade-in and slide-up animation when scrolling into view

These headers serve as the primary navigation landmarks throughout the home page and establish the hierarchical structure of the content.
