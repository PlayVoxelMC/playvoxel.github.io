// Script to load website layout, etc.

function addItem(object, objhtml, parent, first) {
  try {
    if (objhtml) object.innerHTML = objhtml;
    if (first) {
      parent.prepend(object);
    } else {
      parent.append(object);
    }
  } catch (error) {
    console.error("Failed to add item! ", error);
  }
}

async function loadLinks() {
  try {
    const response = await fetch("/assets/links.html");
    if (!response.ok) {
      throw new Error("Links file not found");
    }
    addItem(
      document.createElement("div"),
      await response.text(),
      document.head,
      false,
    );
  } catch (error) {
    console.error("Unable to load links! ", error);
  }
}

async function loadDiscordLinks() {
  let discordUrl = "javascript:alert('Could not get URL, sorry.');";
  try {
    const response = await fetch("/assets/links/discord.txt");

    if (response.ok) {
      const text = (await response.text()).trim();
      if (text) discordUrl = text;
      else console.error("Discord link empty");
    } else {
      console.error("Discord link not found");
    }
  } catch (error) {
    console.error("Unable to load Discord link", error);
  }

  // Change all discord class-ed elems
  document.querySelectorAll(".discord").forEach((el) => {
    el.href = discordUrl;
  });
}

async function loadNav() {
  try {
    const response = await fetch("/assets/nav.html");
    if (!response.ok) {
      throw new Error("Nav file not found");
    }
    addItem(
      document.createElement("nav"),
      await response.text(),
      document.body,
      true,
    );
  } catch (error) {
    console.error("Unable to load nav! ", error);
  }
}

async function loadFooter() {
  try {
    const response = await fetch("/assets/footer.html");
    if (!response.ok) {
      throw new Error("Footer file not found");
    }
    addItem(
      document.createElement("footer"),
      await response.text(),
      document.body,
      false,
    );
  } catch (error) {
    console.error("Unable to load footer! ", error);
  }
}

if (!("fetch" in window)) {
  throw new Error("Missing fetch function!");
}
loadLinks();
loadNav();
loadFooter();
loadDiscordLinks();
