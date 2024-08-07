system.plugin = {
	exec: function(key)
	{
		switch (key)
		{
			// Replace Tracker
			case "replace-tracker":
				system.openDialogFromTemplate({
					id: "dialog-system-replaceTracker",
					options: {
						title: system.lang.dialog["system-replaceTracker"].title,
						width: 600,
						height: 220
					}
				});
				break;

			// Automatically match the data directory
			case "auto-match-data-folder":
				var rows = system.control.torrentlist.datagrid("getChecked");
				var ids = new Array();
				for (var i in rows)
				{
					ids.push(rows[i].id);
				}
				if (ids.length==0) return;

				system.openDialogFromTemplate({
					id: "dialog-auto-match-data-folder",
					options: {
						title: system.lang.dialog["auto-match-data-folder"].title,
						width: 530,
						height: 280
					},
					datas: {
						"ids": ids
					}
				});
				break;
			case "convert-tags":
				const wingTags= ['DEL','DEL_FILE','ERR_VERIFY','ERR_PASSKEY','RAPID_115','RAPID_115_FAIL']
                transmission.torrents.recently.forEach(t=>{
					if(t.tags != null && t.tags.length > 0){
						let tagIds = []
						t.tags.forEach(v=>{
							let tid = wingTags.indexOf(v)
							if(tid>=0) tagIds.push(tid)
						})
						system.config.labelMaps[t.hashString] = tagIds
					}
                })
				system.saveConfig()
				alert("转换完成")
				break
		}
	}
};