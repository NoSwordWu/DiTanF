$json = Get-Content "data/marketData.json" -Raw | ConvertFrom-Json

$newOrgs = @("科技", "体育", "住建")

foreach ($key in $json.visits.PSObject.Properties.Name) {
    foreach ($org in $newOrgs) {
        if (-not $json.visits.$key.PSObject.Properties[$org]) {
            $json.visits.$key | Add-Member -NotePropertyName $org -NotePropertyValue @{count=0; records=@()}
        }
    }
}

$json | ConvertTo-Json -Depth 10 | Set-Content "data/marketData.json"