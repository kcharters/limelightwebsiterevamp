<template>
  <div class="youtube-feed">
    <div class="scroll-container">
      <div v-for="(item, index) in allVideos" :key="item.videoId" class="video-card" @click="openVideo(item.videoUrl)">
        <img :src="item.thumbnail" class="thumbnail" :alt="item.title" />
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "YoutubeFeed",
  data() {
    return {
      allVideos: [], // everything will be rendered at once
    };
  },
  methods: {
    async fetchAllVideos(pageToken = null, collected = []) {
      const api_key = import.meta.env.VITE_YOUTUBE_API;
      const playlist_id = "PLLPqZJRXAEj54NmXieetWPIB9_2lJp2Ew";

      const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
      url.searchParams.set("key", api_key);
      url.searchParams.set("part", "snippet");
      url.searchParams.set("playlistId", playlist_id);
      url.searchParams.set("maxResults", 50);
      if (pageToken) url.searchParams.set("pageToken", pageToken);

      const res = await fetch(url);
      const data = await res.json();

      const videos = data.items.map((item) => {
        const videoId = item.snippet.resourceId.videoId;
        const thumbnail =
          item.snippet.thumbnails?.medium?.url ||
          item.snippet.thumbnails?.standard?.url ||
          item.snippet.thumbnails?.high?.url;

        return {
          videoId,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          videoUrl: `https://youtu.be/${videoId}`,
          thumbnail,
        };
      });

      const updated = collected.concat(videos);

      if (data.nextPageToken) {
        await this.fetchAllVideos(data.nextPageToken, updated);
      } else {
        this.allVideos = updated.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      }
    },

    openVideo(url) {
      window.open(url, "_blank");
    },
  },

  mounted() {
    this.fetchAllVideos();
  },
};
</script>

<style scoped>
.scroll-container {
  max-height: 600px;
  /* You can change this */
  overflow-y: auto;
  padding-right: 8px;
  /* Space for scrollbar */
  margin-bottom: 1rem;
}

.section-title {
  color: white;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.1rem;
}

.video-card {
  cursor: pointer;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  background: #2c2c2c;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.video-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.thumbnail {
  display: block;
  width: 100%;
  height: auto;
  border-bottom: 1px solid #444;
}

.title {
  padding: 0.6rem;
  font-size: 0.95rem;
  color: #fff;
  text-align: center;
  background: #1f1f1f;
}
</style>
