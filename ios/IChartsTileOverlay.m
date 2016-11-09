/**
 * IChartsTileOverlay.m
 * iCharts
 *
 * Ian Fisk on 11/1/16
 */

#import "IChartsTileOverlay.h"

@implementation IChartsTileOverlay

- (void)loadTileAtPath:(MKTileOverlayPath)path result:(void (^)(NSData *data, NSError *error))result {
	[super loadTileAtPath:path result:result];
	
#ifdef DEBUG
	NSLog(@"Load tile at path: z: %zd, x: %zd, y: %zd", path.z, path.x, path.y);
#endif
}

@end
